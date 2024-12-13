import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn", // Muestra una advertencia para variables no usadas
      eqeqeq: "error", // Exige el uso de === y !== en lugar de == y !=
    },
  },

  pluginJs.configs.recommended,
];
