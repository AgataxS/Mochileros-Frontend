import React from 'react';

const SelectDestination = ({ destinations, selectedDestination, setSelectedDestination }) => {
  return (
    <select
      value={selectedDestination}
      onChange={(e) => setSelectedDestination(e.target.value)}
      className="input mb-4"
    >
      <option value="">Select an existing destination</option>
      {destinations.map((destination) => (
        <option key={destination.id_destino} value={destination.id_destino}>
          {destination.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectDestination;
