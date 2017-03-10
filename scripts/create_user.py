import requests
import getpass
import os
import common
import restcall
import argparse

def main():
    parser = argparse.ArgumentParser(description='Quick user creation testing script. Ask for logs and contact the Rest API to create a user with the given logs.')

    parser.add_argument('-u', '--user', action="store", dest="user", help="Username of the new user (skip username input)")
    parser.add_argument('-p', '--password', action="store", dest="password", help="Password of the new user (skip password input)")

    args = parser.parse_args()

    if(args.user and args.password):
        print restcall.create_user((args.user, args.password, "", ""))
    elif(args.user):
        print restcall.create_user((args.user, common.query_string("Password : ", True), "", ""))
    elif(args.password):
        print restcall.create_user((common.query_string("Username : ", False), args.password, "", ""))
    else:
        print restcall.create_user(common.get_logs())

if __name__ == "__main__":
    main()
