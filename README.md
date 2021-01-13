# nucifera

Lotus Notes as it should have been!

Nelumbo nucifera, also known as Indian lotus, sacred lotus, bean of India, Egyptian bean or simply lotus, is one of two extant species of aquatic plant in the family Nelumbonaceae. It is often colloquially called a water lily.

nucifer (feminine nucifera, neuter nuciferum); first/second-declension adjective (nominative masculine singular in -er) bearing, producing or containing nuts.

A re-imagining of Lotus Notes using now-available technologies:

- HTML for rendering
- Markdown/EJS for templating
- PouchDB/CouchDB for eventual-consistency document database management and replication

## Nu-Designed

Nucifera is designed to be a useful (and to work without errors) front-end to any Couch database,
but its power comes from simple design documents that live in the database. There is a minimum set
of these for a database to be called **nu-designed**:

- `{ _id: "docs", template: "builtin:view" }` - the main view of documents (excludes design documents)
- `{ _id: "main", template: "builtin:template" }` - the main document template (for viewing and editing documents)
- `{ _id: "info", template: "builtin:info" }` - database-level settings, including lists of view and templates

### Conventions

- Any document with a `template` property which begins `builtin:` is a design document.
- Any document without a `template` property or with an unrecognized one (no valid doc with that id) will be
  shown and edited with `builtin:main`.
- Any URL representing a view whose view document cannot be found in the database or which is invalid will
  cause a redirect to the 'docs' (i.e. default) view. If 'docs' is missing or invalid, `builtin:docs` will be
  used.

### Remote Hosts

IBM Cloudant: https://9c229f2c-7db1-4aba-9c2d-45ecffb0082a-bluemix.cloudant.com/dashboard.html#/_all_dbs
