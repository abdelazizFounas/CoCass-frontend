#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import sys
import init
import remove
import monitoring

def main(username=None, password=None):
    if username == None and password == None:
        (result, logs) = restcall.log_in(3)[1]
        if not result:
            sys.exit(1)
    else:
        logs = (username, password)
        
    parser = argparse.ArgumentParser(description='CoCass platform Python monitoring script. If this is the first time you use this script, launch it without arguments and follow the setup.')

    parser.add_argument('--rm', action="store_true", dest="remove", help="remove the docker-machine and leave the community")

    args = parser.parse_args()

    if args.remove:
        remove.main()
    else:
        init.main()
        monitoring.main()

if __name__ == "__main__":
    sys.exit(main())
