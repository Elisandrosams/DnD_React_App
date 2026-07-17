import React from 'react'
import { useParams } from 'react-router-dom'
import spells from '../../Assets/Spelldata/spells.json'
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const SpellInfo = () => {
    const { spellName } = useParams();
    const decodedName = decodeURIComponent(spellName);
    const spell = spells.find((spell) => spell.name === decodedName);

    if (!spell) {
        return <p>Spell not found.</p>
    }

  return (
    <div>
        <Navbar />
      <h1>{spell.name}</h1>
      {Object.entries(spell).map(([key, value]) => {
        if (value === null || value === "" || value === undefined) {
          return null; 
        }
        if (key === "level") {
          value = Number(value) === 0 ? "Cantrip" : value;
        }

        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

        return (
          <p key={key}>
            <strong>{label}:</strong>{" "}
            {Array.isArray(value) ? value.join(", ") : value.toString()}
          </p>
        );
      })}
      <Footer />
    </div>
  );
}

export default SpellInfo