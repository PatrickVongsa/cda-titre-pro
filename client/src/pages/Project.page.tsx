import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../hooks/redux.hook";

import { getProjects, addProject } from "../redux/projectSlice";
import { getProjectStatus } from "../redux/projectStatusSlice";
import { getProjectType } from "../redux/projectTypeSlice";

import Header from "../components/header/Header.component";

function Project() {
  const { projects, loading } = useAppSelector((state) => state.projects);
  const { status: projectStatus, loading: loadingStatus } = useAppSelector(
    (state) => state.projectStatus
  );
  const { type: projectType, loading: loadingType } = useAppSelector(
    (state) => state.projectType
  );

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectAmount, setProjectAmount] = useState("");
  const [didDeposit, setDidDeposit] = useState(false);
  const [hasFinancement, setHasFinancement] = useState(false);
  const [hasFullyPaid, setHasFullyPaid] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [host, setHost] = useState("");
  const [oraName, setOraName] = useState("");

  const HandleSubmitAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        addProject({
          name,
          description,
          start_date: new Date(startDate),
          due_date: new Date(dueDate),
          project_amount: Number(projectAmount),
          did_deposit: didDeposit,
          has_financement: hasFinancement,
          has_fully_paid: hasFullyPaid,
          project_status_id: Number(status),
          project_type_id: Number(type),
          link,
          github_link: githubLink,
          host,
          ora_name: oraName,
        })
      ).unwrap();
      setName("");
      setDescription("");
      setStartDate("");
      setDueDate("");
      setProjectAmount("");
      setDidDeposit(false);
      setHasFinancement(false);
      setHasFullyPaid(false);
      setStatus("");
      setType("");
      setLink("");
      setGithubLink("");
      setHost("");
      setOraName("");
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getProjectStatus());
    dispatch(getProjectType());
  }, []);

  return (
    <div className="relative p-4 grow h-screen w-[calc(100%-64rem)]">
      <Header
        pageTitle="Projets"
        searchBar={false}
        tabs={false}
        createButton={false}
        openModal={()=>alert('coucou')}
      />
      <section style={{ display: "flex" }}>
        <div>
          <h2>Ajouter un projet</h2>
          <form onSubmit={HandleSubmitAddProject}>
            <div>
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols={30}
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="start_date">Date de départ</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="due_date">Date de départ</label>
              <input
                type="date"
                name="due_date"
                id="due_date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="project_amount">Montant du projet</label>
              <input
                type="number"
                name="project_amount"
                id="project_amount"
                value={projectAmount}
                onChange={(e) => setProjectAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="did_deposit">Accompte reçu</label>
              <input
                type="checkbox"
                name="did_deposit"
                id="did_deposit"
                value={`${didDeposit}`}
                onChange={(e) => setDidDeposit(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="has_financement">est finançable</label>
              <input
                type="checkbox"
                name="has_financement"
                id="has_financement"
                value={`${hasFinancement}`}
                onChange={(e) => setHasFinancement(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="has_fully_paid">paiement total</label>
              <input
                type="checkbox"
                name="has_fully_paid"
                id="has_fully_paid"
                value={`${hasFullyPaid}`}
                onChange={(e) => setHasFullyPaid(e.target.checked)}
              />
            </div>
            <div>
              <label>
                Choisir le statut:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">-- Choisir --</option>
                  {projectStatus.length &&
                    projectStatus.map((prjtstatus: IProjectType, i: number) => {
                      return (
                        <option value={prjtstatus.id} key={i + prjtstatus.name}>
                          {prjtstatus.name}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Choisir le type:
                <select
                  value={type}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setType(e.target.value);
                  }}
                >
                  <option value="">-- Choisir --</option>
                  {projectType.length &&
                    projectType.map((prjtstype: IProjectType, i: number) => {
                      return (
                        <option value={prjtstype.id} key={i + prjtstype.name}>
                          {prjtstype.name}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="link">Lien du site web</label>
              <input
                type="text"
                name="link"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="github_link">Lien du github</label>
              <input
                type="text"
                name="github_link"
                id="github_link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="host">Nom de l'hébergement</label>
              <input
                type="text"
                name="host"
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ora_name">Nom du suivi sur Ora</label>
              <input
                type="text"
                name="ora_name"
                id="ora_name"
                value={oraName}
                onChange={(e) => setOraName(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>

        <div>
          <h2>Liste des projets</h2>
          {!projects.length && <p>Pas de projets</p>}
          {projects.length > 0 &&
            projects.map((project: IProject, i: number) => {
              return <p key={i}>{project.name}</p>;
            })}
        </div>
        
      </section>
    </div>
  );
}

export default Project;
