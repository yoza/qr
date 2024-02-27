CREATE MIGRATION m1x3w4bunpyjotsact5xfvevv2zqbsrafaghpw5pejelh35qex4glq
    ONTO initial
{
  CREATE TYPE default::Ingredient {
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::RecipeIngredient {
      CREATE REQUIRED LINK item: default::Ingredient;
      CREATE PROPERTY quantity: std::decimal;
      CREATE REQUIRED PROPERTY unit: std::str;
  };
  CREATE TYPE default::Recipe {
      CREATE MULTI LINK ingredients: default::RecipeIngredient;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
};
