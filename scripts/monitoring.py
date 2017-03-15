import sched, time
from restcall import send_current_config

s = sched.scheduler(time.time, time.sleep)

def loop(sc, username, password):
	if not send_current_config(username, password):
		print "Communication with the server failed."
	s.enter(1, 1, loop, (sc, username, password)) # first argument defines the delta of seconds between every call


def main(username=None, password=None):
    if username == None and password == None:
        (result, logs) = restcall.log_in(3)[1]
        if not result:
            sys.exit(1)
    else:
        logs = (username, password)

	s.enter(1, 1, loop, (s, username, password,))
	s.run()
