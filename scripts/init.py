'''
init.py
This Python script contains all the function to initialize a docker-machine on a computer
/!\ Please, do not edit this file /!\
'''

import docker
import sys
import subprocess
import os
import requests
import common
import restcall
import netifaces

'''
ON WORKING :
    - Send running configuration
    - Arguments
    - Docker-machine VPN access
        -> Test : In a VM, set up a VPN network. Create a docker-machine and ssh in it. Try to ping the VPN server.
'''

# Installation checking
# Checks if docker, docker-machine and virtualbox are installed
# @return : True if all the tools are installed, false otherwise
def check_installation():
    try:
        subprocess.check_output(["docker", "version"])
        subprocess.check_output(["docker-machine", "version"])
        subprocess.check_output(["virtualbox", "--help"])
        subprocess.check_output(["openvpn", "--help"])
        return True
    except Exception:
        return False

# Check if a docker-machine exists by getting the information of the docker-machine inspect command
# @param name : The name of the docker-machine to check
# @return : True or False according to the existance of the docker-machine
def check_docker_machine(name):
    cmd = "docker-machine inspect " + name
    return common.exec_cmd(cmd)

# Start a docker-machine
# @param name : The name of the docker-machine to start_docker_machine
# @return : True or False according to the success of the docker-machine start
def start_docker_machine(name):
    cmd = "docker-machine start " + name
    return common.exec_cmd(cmd)

# Checks if a docker-machine is running by trying to get its IP address
# @param name : The name of the docker-machine to check_output
# @return : True or False according to if the docker-machine is running or not
def is_dm_running(name):
    cmd = "docker-machine ip " + name
    return common.exec_cmd(cmd)

# Create a docker-machine
# This function will ask to the user if he want to give a specific configuration to the docker-machine
# TODO No interaction with user in this function ?
# @param name : The name of the docker-machine to create
# @return : A dict containing the configuration of the docker machine, with 3 fields : ram, cpu and disk (-1 if not limited)
def create_docker_machine(name, custom = True):
    if custom and common.query_yes_no("Define a docker-machine with custom ressources ?"):
        ram = common.query_int("\tRAM (Mo) : ")
        cpu = common.query_int("\tNumber of CPU : ")
        disk = common.query_int("\tDisk space (Go) : ")
        cmd_create_dm = "docker-machine create -d virtualbox --virtualbox-disk-size " + str(disk) + " --virtualbox-cpu-count " + str(cpu) + " --virtualbox-memory " + str(ram) + " " + name
        config = {common.KEY_CONFIG_RAM: str(ram), common.KEY_CONFIG_CPU: str(cpu), common.KEY_CONFIG_HDD: str(disk)}
    else:
        cmd_create_dm = "docker-machine create -d virtualbox " + name
        config = {common.KEY_CONFIG_RAM: "1", common.KEY_CONFIG_CPU: "1", common.KEY_CONFIG_HDD: "18"}

    ps_creation = subprocess.Popen(cmd_create_dm.split(), stdout=subprocess.PIPE)
    create_dm_out, check_dm_error = ps_creation.communicate()
    print "Docker-machine created."
    return config

# Remove a docker-machine
# @param name : The name of the docker-machine to remove_docker_machine
# @return : True or false according to the success of the remove
def remove_docker_machine(name):
    cmd = "docker-machine rm -y " + name
    return common.exec_cmd(cmd)

# Switch the current docker-machine to another one
# @param name : The name of the docker-machine to switch to
# @return : A docker.Client object using the docker-machine
def switch_dm(name):
    cmd_env = "docker-machine env " + common.DOCKER_MACHINE_NAME
    try:
        result_env = [l for l in subprocess.check_output(cmd_env.split()).split('\n') if not l.startswith('#')]
    except Exception:
        return

    for c in result_env:
        if c == '':
            continue
        current = c.split(' ')[1]
        os.environ[current.split('=')[0]] = current.split('=')[1].replace('"', '')
    return docker.from_env()

def main(username=None, password=None, custom = True):

    if check_installation():

        if username == None and password == None:
            (result, (username, password)) = restcall.log_in(3)
            if not result:
                sys.exit(1)

        if not is_dm_running(common.DOCKER_MACHINE_NAME) and check_docker_machine(common.DOCKER_MACHINE_NAME) and not start_docker_machine(common.DOCKER_MACHINE_NAME):
            # Docker-machine is not running, is created but cannot be started
            print "A docker-machine named " + common.DOCKER_MACHINE_NAME + " already exists but can not be started. Let's remove it and create a new one !"
            remove_docker_machine(common.DOCKER_MACHINE_NAME)

        check_docker_machine(common.DOCKER_MACHINE_NAME)
        if not check_docker_machine(common.DOCKER_MACHINE_NAME):
            restcall.send_config(create_docker_machine(common.DOCKER_MACHINE_NAME, custom), username, password)

            success = True
            for rule in common.NEEDED_RULES:
                success = success and common.binding_rule_create(rule)
            if not success:
                print "Networking rules creation failed."
                sys.exit(1)

        client = switch_dm(common.DOCKER_MACHINE_NAME)

        listen_ip = netifaces.ifaddresses(common.LOCAL_NET_INTERFACE)[2][0]['addr']
        try:
            client.swarm.join(remote_addrs=[common.SERVER_IP], join_token=restcall.swarm_token(), listen_addr=listen_ip)
        except docker.errors.APIError:
            print "The server sent an error. If it says that a new try will be performed in background, that's all right. However... Ctrl + C :D"
    else:
        print "You first need to install docker, docker-machine and VirtualBox."
        sys.exit(1)

    print "Done."

if __name__ == "__main__":
    main()
