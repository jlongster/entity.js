
define(["default-engine", "dynamics"],
       function(DefaultEngine, d) {
           d.createDynamic("engine", new DefaultEngine());
           return d;
       });