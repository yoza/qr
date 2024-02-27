CREATE MIGRATION m1qx2pij3qpktqvmcllk4tp2le34dfjxtjgtxweo4ns3ibaxh5eevq
    ONTO m1pdekor5yf7tieezkvfz54hwvrvweecpywywe5ffkdslthlcg3jca
{
  ALTER TYPE default::User {
      CREATE PROPERTY email: std::str;
  };
};
