import React from 'react';

export default function CertificateSelector(props) {
  const { certificates, onChange } = props;
  return (
    <select
      name="certificate"
      className="form-control"
      onChange={evt => onChange(evt)}
    >
      <option value="NaN" />
      {certificates && certificates.map(certificate => (
        <option
          value={certificate.id}
          key={certificate.id}
        >
          {certificate.name}
        </option>
      ))}
    </select>
  );
}
