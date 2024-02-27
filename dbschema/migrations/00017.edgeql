CREATE MIGRATION m1xcamkbuim4hfwncrho2mvlypcoswjtopb46fwo2ciqta3pwl332q
    ONTO m14t2rbz22gnnskdbge4xlpi3x6ydsq4teiaofebeoybztjacvrrpq
{
  ALTER TYPE default::User {
      CREATE ACCESS POLICY self_only
          ALLOW ALL USING (((GLOBAL default::currentUser).id ?= .id));
  };
};
