import { useState } from "react";

type Tache = {
  id: number;
  description: string;
  fait: boolean;
};

export function TodoApp() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [saisie, setSaisie] = useState("");

  const ajouterTache = () => {
    if (saisie.trim() === "") return;
    const nouvelleTache: Tache = {
      id: Date.now(),
      description: saisie,
      fait: false,
    };
    setTaches((prev) => [...prev, nouvelleTache]);
    setSaisie("");
  };

  const basculerTache = (id: number) => {
    setTaches((prev) =>
      prev.map((tache) =>
        tache.id === id ? { ...tache, fait: !tache.fait } : tache
      )
    );
  };

  const supprimerTache = (id: number) => {
    setTaches((prev) => prev.filter((tache) => tache.id !== id));
  };

  const tachesTriees = taches.sort((a, b) => Number(a.fait) - Number(b.fait));

  return (
    <>
      <div className="flex">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Ajouter une tâche"
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" onClick={ajouterTache}>
          +
        </button>
      </div>

      <div className="my-5 flex-column gap-5 w-full text-left">
        {tachesTriees.map((tache) => (
          <div
            key={tache.id}
            className={`${
              tache.fait ? "bg-indigo-900 line-through" : "bg-indigo-700"
            } w-full m-5 rounded-box p-3 flex`}
          >
            <span className="pr-8">
              <input
                type="checkbox"
                className="checkbox"
                checked={tache.fait}
                onChange={() => basculerTache(tache.id)}
              />
            </span>
            <span className="flex-grow">{tache.description}</span>
            <div>
              <button
                className="btn btn-error btn-outline btn-xs"
                onClick={() => supprimerTache(tache.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
