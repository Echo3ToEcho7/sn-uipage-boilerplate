var data = {};
var incidents = new GlideRecord('incident');
var crs = new GlideRecord('change_request');

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
    avatar: '' + assigned_to.photo,
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
    avatar: '' + assigned_to.photo,
    sys_class_name: '' + crs.sys_class_name
  });
}

(new global.JSON().encode(data)) + '';
