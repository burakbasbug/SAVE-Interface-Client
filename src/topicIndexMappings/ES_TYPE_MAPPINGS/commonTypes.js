/* eslint-disable-file no-unused-vars */

/**
 "enabled: false"
  - store but dont index. Only used for OBJECTS
 "index : false"
  - store but dont index.
  - Only used for FIELDS, so you give a type as well
  - ALWAYS GIVEN with a "type"
  - Fields that are not indexed are not queryable.
 */
module.exports = {
  disabled: { enabled: false },
  keyword: { type: 'keyword' },
  keywordNoIndex: { type: 'keyword', index: false },
  int: { type: 'integer' },
  intNoIndex: { type: 'integer', index: false },
  date: { type: 'date', format: 'epoch_millis' },
  float: { type: 'float' },
  bool: { type: 'boolean' },
};
