<script>
  import { db } from "./firebase";

  let task = {
    name: "",
    description: "",
  };

  let tasks = [];
  let currentId = null;
  let isEditing = false;

  // Listen for changes in the tasks collection
  db.collection("tasks").onSnapshot((querySnapshot) => {
    tasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  const addTask = async () => {
    await db.collection("tasks").add({
      ...task,
      createdAt: Date.now(),
    });
    task = { name: "", description: "" };
  };

  const updateTask = async () => {
    await db.collection("tasks").doc(currentId).update(task);
    task = { name: "", description: "" };
    currentId = null;
    isEditing = false;
  };

  const deleteTask = async (id) => {
    await db.collection("tasks").doc(id).delete();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      addTask();
    } else {
      updateTask();
    }
  };

  const handleEdit = (currentTask) => {
    isEditing = true;
    task = { ...currentTask };
    currentId = currentTask.id;
  };

  const handleCancel = () => {
    task = { name: "", description: "" };
    currentId = null;
    isEditing = false;
  };
</script>

<form on:submit={handleSubmit}>
  <input
    bind:value={task.name}
    type="text"
    name="name"
    placeholder="Nome da tarefa"
  />
  <textarea
    bind:value={task.description}
    rows="3"
    name="description"
    placeholder="Descrição da tarefa"
  />
  <button>
    {#if !isEditing}Salvar{:else}Atualizar{/if}
  </button>
  {#if isEditing}
    <button on:click={handleCancel}>Cancelar</button>
  {/if}
</form>

{#each tasks as task}
  <p>id: {task.id}</p>
  <p>Nome: {task.name}</p>
  <p>Descr: {task.description}</p>
  <p>Data: {task.createdAt}</p>
  <button on:click={() => deleteTask(task.id)}>Remover</button>
  <button on:click={() => handleEdit(task)}>Editar</button>
{/each}

<style>
</style>
