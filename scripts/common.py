'''
common.py
This file containes all commons values/function for the CoCass script
/!\ Please, do not edit this file /!\
'''

import getpass
import sys
import subprocess

# Constants definition
DOCKER_MACHINE_NAME = "dm-iaas"

SERVER_IP = "localhost"
SERVER_PORT = "5000"
SERVER_URL = "http://" + SERVER_IP + ":" + SERVER_PORT + "/"

CODE_SUCCESS = 202
CODE_FAILURE = 403

KEY_CONFIG_CPU = "cpu"
KEY_CONFIG_RAM = "ram"
KEY_CONFIG_HDD = "hdd"

NEEDED_RULES = [(2377, 2377, "tcp"), (7946, 7946, "tcp"), (7946, 7946, "udp"), (4789, 4789, "udp")]

# Query a yes/no answer
# Code from this post : https://stackoverflow.com/questions/3041986/apt-command-line-interface-like-yes-no-input
# @param question : Question to display
# @param default : The default answer (if no one entered)
# @retrun : True or False, according to user choice yes or no
def query_yes_no(question, default="yes"):
    valid = {"yes": True, "y": True, "ye": True,
             "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' "
                             "(or 'y' or 'n').\n")

# Query a int value
# @param question : The question to display
# @return : The int value from the user
def query_int(question):
    valid = False
    while not valid:
        try:
            result = int(input(question))
            valid = True
        except Exception:
            valid = False
    return result

# Query a string value, confidentially or not
# @param question : The question to display
# @param confidential : A boolean accordig to if the answer is confidential
# @return : The string value from the user
def query_string(question, confidential):
    if confidential:
        return getpass.getpass(question)
    else:
        return raw_input(question)

# Query log information to user
# @return : A tupple (username, password)
def get_logs():
    user = query_string("Username : ", False)
    pswd = query_string("Password : ", True)
    return (user, pswd)

# Execute a system command
# @param cmd : A string representig the command to Execute
# @return : True or False according to the success of the command's execution
def exec_cmd(cmd):
    try:
        subprocess.check_output(cmd.split())
        return True
    except Exception :
        return False

# Bind a VirtualBox port on the physical host
# @param portdm : The docker-machine's port to bind on the host
# @param porthost : The corresponding port host to access to the docker-machine's one
# @param protocol : Protocol to use on the port
# @return : (bool, String) True or False according to the succes of the operation, with the name of the rule
def binding_rule_create((porthost, portdm, protocol)):
    rule_name = "rule" + str(porthost) + protocol
    cmd = "VBoxManage controlvm " + DOCKER_MACHINE_NAME + " natpf1 " + rule_name + "," + str(protocol) + ",," + str(porthost) + ",," + str(portdm)
    return (exec_cmd(cmd), rule_name)

# Delete a binding rule from the docker-machine to the host
# @param rule_name : The name of the rule to delete
# @return : True or False according to the succes of the remove
def binding_rule_remove(rule_name):
    cmd = "VBoxManage controlvm " + DOCKER_MACHINE_NAME + " natpf1 delete " + rule_name
    return exec_cmd(cmd)

def main():
    print "---------- Functions testing ----------"
    print query_yes_no("Query yes/no test : ")
    print query_string("Query string test : ", False)
    print query_string("Query string test (confidential) : ", True)
    print query_int("Query int test : ")

if __name__ == "__main__":
    main()
