CREATE MIGRATION m156tx4r7sobfgytgm7c6uzkhqmfdutrfzkkzd25ez6arsur2aygba
    ONTO m1yctnzn2p764sy5p3qavz3aefqdl26cvek4nhx65zhndjksd6eytq
{
  ALTER TYPE default::Recipe {
      CREATE INDEX fts::index ON ((fts::with_options(.name, language := fts::Language.rus), fts::with_options(.description, language := fts::Language.rus)));
  };
};
