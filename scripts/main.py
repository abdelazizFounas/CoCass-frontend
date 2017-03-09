#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import sys
import init

def main(argv = None):
    parser = argparse.ArgumentParser(description='CoCass platform Python monitoring script. If this is the first time you use this script, launch it without arguments and follow the setup.')

    args = parser.parse_args()

    init.main()

if __name__ == "__main__":
    sys.exit(main())
