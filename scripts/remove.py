import common
import restcall
import subprocess

def main():
    logs = restcall.log_in(3)[1]

    if restcall.remove_worker(logs):
        cmd = "docker-machine rm -y " + common.DOCKER_MACHINE_NAME
        try:
            subprocess.check_output(cmd.split()).split('\n')
            print "Docker-machine removed."
        except Exception :
            print "No docker-machine to remove."

if __name__ == "__main__":
    main()
