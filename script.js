const repositoryList = document.querySelector("#repository-list");
const repositoryStatus = document.querySelector("#repository-status");

function renderRepository(repository) {
  const item = document.createElement("li");
  const card = document.createElement("article");
  const heading = document.createElement("h3");
  const link = document.createElement("a");
  const description = document.createElement("p");
  const starredAt = document.createElement("time");

  card.className = "repository-card";
  link.href = repository.url;
  link.textContent = repository.repository;
  heading.append(link);
  description.textContent = repository.description;
  starredAt.dateTime = repository.starred_at;
  starredAt.textContent = `Starred ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}`;

  card.append(heading, description, starredAt);
  item.append(card);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("The repository data is not in the expected format.");
    }

    repositoryList.replaceChildren(...repositories.map(renderRepository));
    repositoryStatus.textContent = repositories.length
      ? `${repositories.length} repositories in this collection.`
      : "No starred repositories yet.";
  } catch (error) {
    repositoryStatus.textContent = "Repositories could not be loaded. Please try again later.";
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();
