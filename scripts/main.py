#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
main.py
/!\ Please, do not edit this file /!\

Libraries :
    - docker
    - requests
    - psutil
    - passlib
'''

import argparse
import sys
import init
import remove
import restcall
import monitoring

def main():

    parser = argparse.ArgumentParser(description='CoCass platform Python monitoring script. If this is the first time you use this script, launch it without arguments and follow the setup.')

    parser.add_argument('--rm', action="store_true", dest="remove", help="remove the docker-machine and leave the community")

    args = parser.parse_args()

    (result, (username, password)) = restcall.log_in(3)
    if not result:
        sys.exit(1)

    if args.remove:
        remove.main(username, password)
    else:
        init.main(username, password)
        monitoring.main()

if __name__ == "__main__":
    sys.exit(main())
