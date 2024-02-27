CREATE MIGRATION m1fl5g3xsnvk7z4ytbrrkvaesx3zde3ypkhcn2h2bt33oajlh2zqmq
    ONTO m1l5mwlngq7hnkhqx6qkbokpkvd4rc5qrjsefbk7lxenoykfiieuqa
{
  ALTER TYPE default::RecipeIngredient {
      DROP LINK item;
  };
  ALTER TYPE default::RecipeIngredient {
      CREATE PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      EXTENDING default::Ingredient LAST;
  };
  ALTER TYPE default::RecipeIngredient {
      ALTER PROPERTY name {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
