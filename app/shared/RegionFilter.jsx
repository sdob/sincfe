import React from 'react';

export default function RegionFilter(props) {
  const { onChange, regions } = props;
  return (
    <div>
      {regions.map(region => (
        <div className="col-xs-6 col-md-3" key={region.id}>
          <div className="checkbox">
            <label htmlFor={`region-${region.id}`}>
              <input
                name={`region-${region.id}`}
                type="checkbox"
                defaultChecked
                onChange={evt => onChange(region.id, evt.target.checked)}
              />
              {region.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
