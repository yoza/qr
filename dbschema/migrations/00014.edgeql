CREATE MIGRATION m1fhkctbs7yjteouokiiogabz5uub3dq3q46pptp4vz5s24vzxtaya
    ONTO m1qx2pij3qpktqvmcllk4tp2le34dfjxtjgtxweo4ns3ibaxh5eevq
{
  ALTER TYPE default::User {
      CREATE PROPERTY avatar: std::str;
      CREATE REQUIRED PROPERTY is_admin: std::bool {
          SET default := false;
      };
  };
};
