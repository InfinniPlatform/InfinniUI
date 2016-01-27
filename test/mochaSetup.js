

var assert = chai.assert;

var forTeamcity = function(){
	(function(){

		function Base(runner) {
		  var self = this
		    , stats = this.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 }
		    , failures = this.failures = [];

		  if (!runner) return;
		  this.runner = runner;

		  runner.stats = stats;

		  runner.on('start', function(){
		    stats.start = new Date;
		  });

		  runner.on('suite', function(suite){
		    stats.suites = stats.suites || 0;
		    suite.root || stats.suites++;
		  });

		  runner.on('test end', function(test){
		    stats.tests = stats.tests || 0;
		    stats.tests++;
		  });

		  runner.on('pass', function(test){
		    stats.passes = stats.passes || 0;

		    var medium = test.slow() / 2;
		    test.speed = test.duration > test.slow()
		      ? 'slow'
		      : test.duration > medium
		        ? 'medium'
		        : 'fast';

		    stats.passes++;
		  });

		  runner.on('fail', function(test, err){
		    stats.failures = stats.failures || 0;
		    stats.failures++;
		    test.err = err;
		    failures.push(test);
		  });

		  runner.on('end', function(){
		    stats.end = new Date;
		    stats.duration = new Date - stats.start;
		  });

		  runner.on('pending', function(){
		    stats.pending++;
		  });
		}

		/**
		 * Output common epilogue used by many of
		 * the bundled reporters.
		 *
		 * @api public
		 */

		Base.prototype.epilogue = function(){
		  var stats = this.stats;
		  var tests;
		  var fmt;

		  console.log();

		  // passes
		  fmt = color('bright pass', ' ')
		    + color('green', ' %d passing')
		    + color('light', ' (%s)');

		  console.log(fmt,
		    stats.passes || 0,
		    ms(stats.duration));

		  // pending
		  if (stats.pending) {
		    fmt = color('pending', ' ')
		      + color('pending', ' %d pending');

		    console.log(fmt, stats.pending);
		  }

		  // failures
		  if (stats.failures) {
		    fmt = color('fail', '  %d failing');

		    console.error(fmt,
		      stats.failures);

		    Base.list(this.failures);
		    console.error();
		  }

		  console.log();
		};

		/**
		 * Initialize a new `Teamcity` reporter.
		 *
		 * @param {Runner} runner
		 * @api public
		 */

		function Teamcity(runner) {
			Base.call(this, runner);

			var stats = this.stats;

			runner.on('suite', function(suite) {
				if (suite.root) return;
				console.log("##teamcity[testSuiteStarted name='" + escape(suite.title) + "']");
			});

			runner.on('test', function(test) {
				console.log("##teamcity[testStarted name='" + escape(test.title) + "' captureStandardOutput='true']");
			});

			runner.on('fail', function(test, err) {
				console.log("##teamcity[testFailed name='" + escape(test.title) + "' message='" + escape(err.message) + "' captureStandardOutput='true' details='" + escape(err.stack) + "']");
			});

			runner.on('pending', function(test) {
				console.log("##teamcity[testIgnored name='" + escape(test.title) + "' message='pending']");
			});

			runner.on('test end', function(test) {
				console.log("##teamcity[testFinished name='" + escape(test.title) + "' duration='" + test.duration + "']");
			});

			runner.on('suite end', function(suite) {
				if (suite.root) return;
				console.log("##teamcity[testSuiteFinished name='" + escape(suite.title) + "' duration='" + (new Date() - suite.startDate) + "']");
			});

			runner.on('end', function() {
				console.log("##teamcity[testSuiteFinished name='mocha.suite' duration='" + stats.duration + "']");
			});
		}

		/**
		 * Escape the given `str`.
		 */

		function escape(str) {
		  if (!str) return '';
		  return str
		    .toString()
		    .replace(/\|/g, "||")
		    .replace(/\n/g, "|n")
		    .replace(/\r/g, "|r")
		    .replace(/\[/g, "|[")
		    .replace(/\]/g, "|]")
		    .replace(/\u0085/g, "|x")
		    .replace(/\u2028/g, "|l")
		    .replace(/\u2029/g, "|p")
		    .replace(/'/g, "|'");
		}


		mocha.setup({
			ui: "bdd",
			reporter: Teamcity
		});
	})();
};

var forUser = function(){
	mocha.setup({
		ui: "bdd"
	});
};

if(window.location.hash == "#teamcity"){
	forTeamcity();
}else{
	forUser();
}