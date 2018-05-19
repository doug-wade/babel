const MetasyntacticVariables = enum {
  FOO = { val: Symbol("FOO"), toString: () => { console.log('foo'); } },
  BAR = "BAR",
  BAZ = 2,
  QUUX = () => 'quux',
}
