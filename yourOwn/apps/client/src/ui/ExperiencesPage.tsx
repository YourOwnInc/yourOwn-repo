// imports
import { useState} from "react";
// created component that holds api contracts for experinces
import { usePortfolioStore } from "../domain/usePortfolioStore";
import { ExperienceDTO, SessionId } from "../domain/types";
import ExperienceForm from "./ExperienceForm";


// Displays the main page where exp will live
// Will show and hole the ExperienceForm to CRUD them
// TO BE EXPANDED:
// When we focus on the desing of the website, we will change this function 
export default function ExeriencesPage({sessionId}: { sessionId: SessionId}) {
    const {experiences, editExperience, removeExperience } = usePortfolioStore(); // inserts sessionId to prop so that all service calls use that id 
    const [mode, setMode] = useState<"list" | "add" | "edit">("list");
    const [editing, setEditing] = useState<ExperienceDTO | null>(null);

    // Resets mode back to list when creating or editign a exp 
    function onCreateDone() {
        setMode("list");
    }

    function onEditDone() {
        setEditing(null);
        setMode("list")
    }

    // when mode is in add , we show experince Form 
    if( mode === "add") {
        return (
        <div>
            <h2>New Experience (Quick)</h2>
            <ExperienceForm
            onSubmit={async (payload) => {
              
                onCreateDone();
            }}
            onCancel={() => setMode("list")}
            />
        </div>
        );
    }

    if(mode === "edit" && editing ) {
        return (
        <div>
            <h2>Edit Experience</h2>
            <ExperienceForm
            initial={editing}
            onSubmit={async (payload) => {
                await editExperience(editing.id, payload);
                onEditDone();
            }}
            onCancel={() => setMode("list")}
            />
        </div>
    );
        
    }


  return (
    <div>
      <header style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <h2 style={{ marginRight: "auto" }}>Experiences</h2>
        <button onClick={() => setMode("add")}>Add Quick</button>
        {/* TODO MVP+1: Add Guided, Import Resume */}
      </header>

      <ul>
        {experiences.map((e) => (
          <li key={e.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ flex: 1 }}>{e.title}</span>
            <small>{e.type ?? "-"}</small>
            <button onClick={() => { setEditing(e); setMode("edit"); }}>Edit</button>
            <button onClick={() => removeExperience(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );


}