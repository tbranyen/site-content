var git = require('nodegit');

git.repo('./.git', function(err) {

  console.log('repo', err);

  this.branch('master', function(err) {
    console.log('branch', err);
  });
});
