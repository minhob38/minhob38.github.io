select json_build_object(
  'type', 'FeatureCollection',
  'features', json_agg(ST_AsGeoJSON(t.*)::json)
  )
from ( values (1, 'one', 'POINT(1 1)'::geometry),
            (2, 'two', 'POINT(2 2)'),
            (3, 'three', 'POINT(3 3)')
   ) as t(id, name, geom);