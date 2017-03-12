import common
import os

def remove_rules_from_file(filename):
    rulesfile = open(filename, 'r')
    success = True
    for line in rulesfile:
        success = success and common.binding_rule_remove(line)
    rulesfile.close()
    return success

def rules_creation():
    rulesfile = open(common.RULE_FILE, 'w')
    rulesfile.write("%s\n" % common.binding_rule_create(2377, 2377, "tcp")[1])
    rulesfile.write("%s\n" % common.binding_rule_create(7946, 7946, "tcp")[1])
    rulesfile.write("%s\n" % common.binding_rule_create(7946, 7946, "udp")[1])
    rulesfile.write("%s\n" % common.binding_rule_create(4789, 4789, "udp")[1])
    rulesfile.close()

def main():
    if remove_rules_from_file(common.RULE_FILE):
        print "Removing " + common.RULE_FILE
        os.remove(filename)

if __name__ == "__main__":
    main()
