CREATE MIGRATION m17e3qarmj7foemqhg7dwvsbsdkywdbmyzg4ojsrrsr4u2fuq5igzq
    ONTO m1qgjsrhhh3ifwnwl2qza4ttd7eqpmj4klrgoeol5e5xmp3zijodta
{
  DROP FUTURE nonrecursive_access_policies;
  ALTER TYPE default::Recipe {
      CREATE INDEX fts::index ON ((fts::with_options(.name, language := fts::Language.rus), fts::with_options(.description, language := fts::Language.rus)));
  };
};
