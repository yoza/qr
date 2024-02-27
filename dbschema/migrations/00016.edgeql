CREATE MIGRATION m14t2rbz22gnnskdbge4xlpi3x6ydsq4teiaofebeoybztjacvrrpq
    ONTO m1rsmyecnwso7e32qpqrr4rqf2lsifobtlrequjpjf42hgsxr5hh6a
{
  ALTER TYPE default::User {
      ALTER ACCESS POLICY admin_only SET errmessage := 'Only admins may query Users';
  };
};
