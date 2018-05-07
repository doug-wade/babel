# babel-lint

Hello intrepid explorer and welcome to babel-lint.  As you can see from the bin
script in `./bin.index.js`, this package doesn't actually _do_ anything yet, so
there's lots of work to be done!  I thought I'd spend some time documenting what
I've discovered so far to make digging in easier, and to check in to make sure
I haven't gone off the rails, which is why I've checked in at such an early
point.  Don't worry!  This makes your input more valued, and easier to
incorporate 🤣😂😭 The inimitable Henry Zhu
(hzoo) pointed me at [this PR](https://github.com/babel/babel/pull/5735) as a
good starting point.


## Reading config

The current code for reading config lives in `babel-core/src/config`.  One
initial approach I considered was using a
[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
during the normal configuration loading, and watching for plugins and presets
that set configuration values that have already been configured, and then
emitting warnings or errors, depending on what was set and by whom.  After
further research, I don't think this approach can work, since the preset or
plugin that sets the configuration first may be the offender.  We should,
however, try to share as much of our configuration reading behavior with
babel-core as possible, possibly even abstracting out a babel-config package.


## Deprecation

I would like to use the npm registry as the single source of truth to find out
which presets and plugins are deprecated, so that emitting deprecation warnings
to every install of babel-lint is as fast an easy as `npm deprecate`. As far as
I can tell, the best way to find if a given plugin or preset is deprecated will
be to get its version from package.json (either the user's package.json or the
installed module's package.json, I'm not sure which just yet -- the benefit to
the installed is correctness (you have installed a deprecated version), but the
benefit to the user's is relevancy (saying, in effect: yeah, you _currently_
have a deprecated version installed, but a current version is included in your
version range, so you're effectively okay)), call `npm show package@version`,
parse the console output as json and check for the "deprecated" key in the
returned json. It is possible we could reduce the overhead by using the
[npm registry client](https://www.npmjs.com/package/npm-registry-client)
instead.


## Redundancy

Redundancy seems simple at the outset.  Consider, for instance, the
`redundant-plugin` test case: we compute all the plugins configured by presets,
and then for each plugin, we test to see if it is already contained, when it is
we emit an error (if the same configuration) or a warning (if with different
configuration), and when its not we add it to the set.  However, things get more
complicated with considering the set of presets.  I think the algorithm will be:
compute the set of all plugins configured by all presets, sort the presets in
order of total number of configured plugins, and then consider them from most
plugins to least.  If the next preset to be added to the current configuration
has all plugins already configured, emit an error (a warning if at least one
plugin has different configuration from an existing plugin).  I think we're safe
here, because a preset can't include all plugins from another preset that has
more plugins configured. It does, I think, introduce a bias towards larger
presets, which may discourage The Node Way ™️ of many small packages that do one
thing, but I think I'm okay with that because its kinda the whole idea of
presets, and why have many small configurations when you can have one big
configuration instead.


## Capabilities

One core idea that emerged out of the
[topographical sorting PR](https://github.com/babel/babel/pull/5735) is the
ability for plugins to expose "capabilities", or the syntax and constructs they
transform.  This would allow us to warn or error in cases where two different
plugins perform the same transform, rendering one of them useless (since by the
time the second plugin performs its transform, all of the relevant syntax has
already been compiled away).  We would need to add capabilities for all of the
plugins currently in the monorepo, and then also advertise them to third-party
plugin authors and maintainers for them to be an effective solution.  My
intuition is to postpone this feature until we've demonstrated value on some of
the low-hanging fruit, but I might be baking a
[minimally viable pizza](https://twitter.com/noluckmurphy/status/700695023428325376).


## Roadmap

- Make the existing tests pass
- Share testing code with babel-cli
- Share config code with babel-core
- Implement capabilities
