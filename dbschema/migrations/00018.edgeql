CREATE MIGRATION m1c2o7xu3ab7dlozchyf2slu34hjjnb3cscvpubpujd64zwb6ravtq
    ONTO m1xcamkbuim4hfwncrho2mvlypcoswjtopb46fwo2ciqta3pwl332q
{
  ALTER TYPE default::User {
      CREATE ACCESS POLICY allow_all_insert
          ALLOW INSERT ;
  };
};
