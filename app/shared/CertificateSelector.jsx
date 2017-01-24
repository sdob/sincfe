import React from 'react';

export default function CertificateSelector(props) {
  const { className, onChange, certificates } = props;
  return (
    <div className={className}>
      <select
        name="certificate"
        className="form-control"
        onChange={evt => onChange(evt)}
      >
        <option />
        {certificates && certificates.map(certificate => (
          <option
            value={certificate.id}
            key={certificate.id}
          >
            {certificate.name}
          </option>
        ))}
      </select>
    </div>
  );
}
