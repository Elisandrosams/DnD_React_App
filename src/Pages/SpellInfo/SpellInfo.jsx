import React from "react";
import { Link, useParams } from "react-router-dom";
import spells from "../../Assets/Spelldata/spells.json";
import ReactMarkdown from "react-markdown";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./SpellInfo.css";
import BackButton from "../../Components/BackBtn/BackBtn";

const SpellInfo = () => {
  const { spellName } = useParams();
  const decodedName = decodeURIComponent(spellName);
  const spell = spells.find((spell) => spell.name === decodedName);

  if (!spell) {
    return <div className="spell-card not-found">Spell not found.</div>;
  }

  const renderValue = (val) => {
    if (Array.isArray(val)) {
      return val.join(", ");
    }

    if (typeof val === "string") {
      const lines = val.trim().split("\n");

      const blocks = [];
      let currentText = [];
      let currentTable = [];

      const flushText = () => {
        if (currentText.length) {
          blocks.push({
            type: "text",
            content: currentText.join("\n"),
          });
          currentText = [];
        }
      };
      const flushTable = () => {
        if (currentTable.length) {
          blocks.push({
            type: "table",
            content: currentTable.map((line) =>
              line.split(/\s{2,}|\t/).map((cell) => cell.trim()),
            ),
          });
          currentTable = [];
        }
      };

      lines.forEach((line) => {
        if (/\s{2,}|\t/.test(line)) {
          if (currentText.length) flushText();
          currentTable.push(line);
        } else {
          if (currentTable.length) flushTable();
          currentText.push(line);
        }
      });
      flushText();
      flushTable();

      return (
        <>
          {blocks.map((block, i) => {
            if (block.type === "text") {
              return (
                <ReactMarkdown
                  key={i}
                  components={{
                    p: ({ node, ...props }) => (
                      <p style={{ margin: "0 0 6px" }} {...props} />
                    ),
                  }}
                >
                  {block.content}
                </ReactMarkdown>
              );
            }
            if (block.type === "table") {
              return (
                <table key={i} className="spell-table">
                  <tbody>
                    {block.content.map((cells, rowIndex) => (
                      <tr key={rowIndex}>
                        {cells.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            <ReactMarkdown>{cell}</ReactMarkdown>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }
            return null;
          })}
        </>
      );
    }

    return val.toString();
  };

  return (
    <>
      <Navbar />
      <BackButton />
      <div className="spell-card">
        <div className="spell-header">
          <h2 className="spell-name">{spell.name}</h2>
          {spell.level !== undefined && (
            <span className="spell-level">
              {Number(spell.level) === 0
                ? "Cantrip Spell"
                : `${spell.level}${["th", "st", "nd", "rd"][(spell.level - 20) % 10] || "th"} Level Spell`}
            </span>
          )}
        </div>

        <div className="spell-meta">
          {Object.entries(spell).map(([key, value]) => {
            if (!value || key === "name" || key === "level") return null;

            const label =
              key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

            return (
              <div key={key} className="spell-field">
                <strong className="green">{label}:</strong> {renderValue(value)}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpellInfo;
