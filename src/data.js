var data = {};
var incidents = new GlideRecord('incident');
var crs = new GlideRecord('change_request');

var getAvatar = function (user_sys_id) {
  var a = new GlideRecord('sys_attachment');

  a.addQuery('table_name', 'ZZ_YYsys_user');
  a.addQuery('file_name', 'photo');

  if (a.get('table_sys_id', user_sys_id)) {
    return a.sys_id + '.iix';
  }

  return '';
};

incidents.addQuery('active', true);
incidents.setLimit(10);
incidents.query();

data.incidents = [];

while(incidents.next()) {
  var assigned_to = incidents.assigned_to.getRefRecord();

  data.incidents.push({
    id: '' + incidents.number,
    desc: '' + incidents.short_description,
    icon: 'computer',
    owner: '' + assigned_to.name,
    avatar: '' + getAvatar(assigned_to.sys_id.toString()),
    sys_class_name: '' + incidents.sys_class_name
  });
}

crs.addQuery('active', true);
crs.setLimit(10);
crs.query();

data.crs = [];
while(crs.next()) {
  var assigned_to = crs.assigned_to.getRefRecord();

  data.crs.push({
    id: '' + crs.number,
    desc: '' + crs.short_description,
    icon: 'computer',
    owner: '' + assigned_to.name,
    avatar: '' + getAvatar(assigned_to.sys_id.toString()),
    sys_class_name: '' + crs.sys_class_name
  });
}

(new global.JSON().encode(data)) + '';
