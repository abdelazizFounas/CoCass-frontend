'''
restcall.py
This Python script contains all the function to call the cocass rest API
/!\ Please, do not edit this file /!\
'''

import common
import requests
import json

# Creates a new user
# @param username
# @param password
# @param firstname
# @param lastname
# @return : True or False according to the success of the creation
def create_user((username, password, firstname, lastname)):
    url = common.SERVER_URL + "User/new"
    headers = {'content-type': 'application/json'}
    payload = {'username': username, 'password': password, 'firstname': firstname, 'lastname':lastname}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    return r.status_code == common.CODE_SUCCESS


# User logging to the website
# @param attempts : The number of logging attempts
# @return : True or False, accordig to the success of the logging
def log_in(attempts):
    t = attempts
    while t > 0:
        if not api_log_in(common.get_logs()):
            t -= 1
            print "Log in failed. Attempts remaining : " + str(t)
        else:
            print "Login successfull."
            return True
    return False

# Login to the server
# @param username
# @param password
# @return : True or False according to the success of the authentication
def api_log_in((username, password)):
    url = common.SERVER_URL + "User/login"
    headers = {'content-type': 'application/json'}
    payload = {'username': username, 'password': password}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    return r.status_code == common.CODE_SUCCESS

def send_system_config():
    ram = psutil.virtual_memory().total
    swap = psutil.swap_memory().total
    disk_total, disk_free = psutil.disk_usage('.').total, psutil.disk_usage('.').free
    cpu_nb = psutil.cpu_count()
    # url = common.SERVER_URL +
    # TODO

# TODO
# Send the configuration
def send_current_config():
    ram = psutil.virtual_memory().percent
    swap = psutil.swap_memory().percent
    disk = 0 #TODO
    # Detect wich CPU is used by the docker-machine
    cpu_usage = psutil.cpu_percent(interval=1, percpu=True)
    # url = common.SERVER_URL +

# Send the configuration to the common.SERVER_URL
# @param config : A dict with KEY_CONFIG_CPU, common.KEY_CONFIG_RAM and common.KEY_CONFIG_HDD representing the configuration of the docker-machine to register
# @return : True or False according to the success of the registration
def send_config(config):
    url = common.SERVER_URL + "Providers/new/" + config[common.KEY_CONFIG_CPU] + "/" + config[common.KEY_CONFIG_RAM] + config[common.KEY_CONFIG_HDD]
    r = requests.request('POST', url)
    if r.status_code == common.CODE_SUCCESS:
        return True
    return False

def swarm_token():
    url = common.SERVER_URL + "swarm"
    r = requests.get(url)
    return r.json()['swarmToken']
