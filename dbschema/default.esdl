using extension graphql;
using extension auth;

module default {

  global currentUser := (
    select User filter .identity = global ext::auth::ClientTokenIdentity
  );

  type Ingredient {
    required name: str;
    description: str;
  }

  type RecipeIngredient extending Ingredient {
    required unit: str;
    quantity: decimal;
  }

  type Recipe {
    required name: str;
    required description: str;
    multi ingredients: RecipeIngredient;
    index fts::index on ((
      fts::with_options(
        .name,
        language := fts::Language.rus
      ),
      fts::with_options(
        .description,
        language := fts::Language.rus
      )
    ));
    # required owner: User {
    #   default := global currentUser;
    # };
    # access policy ownerHasAccess
    #   allow all
    #   using (global currentUser ?= .owner);
  }

  type User {
    property name -> str;
    property email -> str;
    required identity: ext::auth::Identity {
      constraint exclusive;
    };
    property avatar -> str;
    required is_admin: bool { default := false };
    access policy admin_only
      allow all
      using (global currentUser.is_admin ?? false) {
      errmessage := 'Only admins may query Users'
    };
    access policy self_only
      allow all
      using (global currentUser.id ?= .id);
    access policy allow_all_insert
      allow insert
  }
}


# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
# using future nonrecursive_access_policies;
