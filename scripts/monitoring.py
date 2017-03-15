import sched, time
from restcall import send_current_config

def loop(sc):
	send_current_config()
	s.enter(1, 1, loop, (sc,)) # first argument defines the delta of seconds between every call


def main():
	s = sched.scheduler(time.time, time.sleep)
	s.enter(1, 1, loop, (s,))
	s.run()
