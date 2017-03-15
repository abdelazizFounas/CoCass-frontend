import sched, time
from restcall import send_current_config


def loop(sc, username, password): 
	send_current_config(username, password)
	s.enter(1, 1, loop, (sc,)) # first argument defines the delta of seconds between every call


def main(username=None, password=None):
    if username == None and password == None:
        (result, logs) = restcall.log_in(3)[1]
        if not result:
            sys.exit(1)
    else:
        logs = (username, password)
	s = sched.scheduler(time.time, time.sleep)
	s.enter(1, 1, loop, (s,username, password,))
	s.run()
