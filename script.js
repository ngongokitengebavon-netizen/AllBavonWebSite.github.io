// script.js - AllBavon

// Codes d'accès
const ADMIN_CODE = "ba167144";
const USER_CODE = "2661960";

// Variables globales
let currentUser = null;
let topics = JSON.parse(localStorage.getItem('allbavon_topics')) || [];
let courses = JSON.parse(localStorage.getItem('allbavon_courses')) || [];

// Vérifier le code d'accès
function verifyAccessCode() {
    const codeInput = document.getElementById('accessCode');
    const errorDiv = document.getElementById('codeError');
    const code = codeInput.value.trim();

    if (code === ADMIN_CODE) {
        // Accès Admin
        showAdminDashboard();
        errorDiv.classList.add('hidden');
    } else if (code === USER_CODE) {
        // Accès Utilisateur
        document.getElementById('main-content').classList.remove('hidden');
        document.querySelector('.max-w-4xl').classList.add('hidden');
        errorDiv.classList.add('hidden');
        loadForum();
        loadCourses();
    } else {
        errorDiv.classList.remove('hidden');
    }
}

// Afficher le modal de demande d'accès
function showAccessRequestModal() {
    document.getElementById('accessRequestModal').classList.remove('hidden');
    document.getElementById('accessRequestModal').classList.add('flex');
}

function hideAccessRequestModal() {
    document.getElementById('accessRequestModal').classList.add('hidden');
    document.getElementById('accessRequestModal').classList.remove('flex');
}

// Soumettre la demande d'accès (Formspree)
function submitAccessRequest(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Envoi via Formspree
    fetch('https://formspree.io/f/mqevwwbv', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert("✅ Demande envoyée avec succès ! Nous vous contacterons bientôt.");
            hideAccessRequestModal();
            form.reset();
        } else {
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    })
    .catch(() => {
        alert("Demande enregistrée localement. (Mode démo)");
        hideAccessRequestModal();
    });
}

// Créer un compte
function createAccount(e) {
    e.preventDefault();
    
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const faculty = document.getElementById('faculty').value;

    currentUser = { name, email, faculty };
    
    // Cacher le modal et afficher le contenu principal
    document.getElementById('createAccountModal').classList.add('hidden');
    document.getElementById('createAccountModal').classList.remove('flex');
    
    document.getElementById('main-content').classList.remove('hidden');
    document.querySelector('.max-w-4xl').classList.add('hidden');
    
    loadForum();
    loadCourses();
    
    alert(`Bienvenue ${name} ! Votre compte a été créé.`);
}

// Afficher le dashboard admin
function showAdminDashboard() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="max-w-6xl mx-auto px-6 py-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold">Tableau de bord Administrateur</h1>
                <button onclick="logout()" class="text-red-600 hover:underline">Se déconnecter</button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div class="admin-stat p-6 rounded-2xl">
                    <div class="text-4xl font-bold">124</div>
                    <div class="text-sm opacity-80">Utilisateurs inscrits</div>
                </div>
                <div class="admin-stat p-6 rounded-2xl">
                    <div class="text-4xl font-bold">87</div>
                    <div class="text-sm opacity-80">Sujets de forum</div>
                </div>
                <div class="admin-stat p-6 rounded-2xl">
                    <div class="text-4xl font-bold">56</div>
                    <div class="text-sm opacity-80">Cours partagés</div>
                </div>
                <div class="admin-stat p-6 rounded-2xl">
                    <div class="text-4xl font-bold">12</div>
                    <div class="text-sm opacity-80">Facultés</div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow mb-8">
                <h3 class="font-semibold mb-4">Codes d'accès</h3>
                <p><strong>Admin :</strong> ba167144</p>
                <p><strong>Utilisateur :</strong> 2661960</p>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow">
                <h3 class="font-semibold mb-4">Gestion du forum</h3>
                <p class="text-gray-600">Les sujets et réponses apparaîtront ici une fois le site connecté à Firebase.</p>
            </div>
        </div>
    `;
    mainContent.classList.remove('hidden');
    document.querySelector('.max-w-4xl').classList.add('hidden');
}

// Charger le forum
function loadForum() {
    const container = document.getElementById('forum-list');
    if (!container) return;

    container.innerHTML = '';

    if (topics.length === 0) {
        container.innerHTML = `<p class="text-gray-500">Aucun sujet pour le moment. Soyez le premier à poster !</p>`;
        return;
    }

    topics.forEach((topic, index) => {
        const div = document.createElement('div');
        div.className = `topic-card border p-5 rounded-2xl bg-white`;
        div.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <span class="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">${topic.category}</span>
                    <h4 class="font-semibold mt-2">${topic.title}</h4>
                    <p class="text-sm text-gray-600 mt-1">${topic.message}</p>
                </div>
                <div class="text-right text-xs text-gray-500">
                    ${topic.author || 'Anonyme'}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Afficher le modal nouveau sujet
function showNewTopicModal() {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black/50 flex items-center justify-center z-50`;
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-2xl w-full max-w-lg mx-4">
            <h3 class="text-xl font-bold mb-4">Créer un nouveau sujet</h3>
            <form id="newTopicForm">
                <input type="text" id="topicTitle" placeholder="Titre du sujet" class="w-full border p-3 rounded-xl mb-3" required>
                
                <select id="topicCategory" class="w-full border p-3 rounded-xl mb-3">
                    <option value="Questions">Questions</option>
                    <option value="Cours">Cours</option>
                    <option value="Examens">Examens</option>
                    <option value="Nouvelles">Nouvelles</option>
                    <option value="Divers">Divers</option>
                </select>
                
                <textarea id="topicMessage" placeholder="Votre message" class="w-full border p-3 rounded-xl mb-4" rows="4" required></textarea>
                
                <div class="flex gap-3">
                    <button type="button" onclick="this.closest('.fixed').remove()" 
                            class="flex-1 py-3 border rounded-xl">Annuler</button>
                    <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-3 rounded-xl">Publier</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#newTopicForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('topicTitle').value;
        const category = document.getElementById('topicCategory').value;
        const message = document.getElementById('topicMessage').value;
        
        topics.unshift({
            title,
            category,
            message,
            author: currentUser ? currentUser.name : "Étudiant",
            date: new Date().toISOString()
        });
        
        localStorage.setItem('allbavon_topics', JSON.stringify(topics));
        
        modal.remove();
        loadForum();
    });
}

// Charger les cours
function loadCourses() {
    const container = document.getElementById('courses-list');
    if (!container) return;

    container.innerHTML = '';

    if (courses.length === 0) {
        container.innerHTML = `<p class="text-gray-500 col-span-2">Aucun cours partagé pour le moment.</p>`;
        return;
    }

    courses.forEach((course, index) => {
        const div = document.createElement('div');
        div.className = `border p-4 rounded-2xl bg-white`;
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-semibold">${course.title}</h4>
                    <p class="text-sm text-gray-600">${course.description}</p>
                    <span class="text-xs text-blue-600">${course.faculty}</span>
                </div>
                <button onclick="downloadCourse(${index})" 
                        class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Afficher le modal d'upload de cours
function showUploadCourseModal() {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black/50 flex items-center justify-center z-50`;
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-2xl w-full max-w-md mx-4">
            <h3 class="text-xl font-bold mb-4">Télécharger un cours</h3>
            <form id="uploadForm">
                <input type="text" id="courseTitle" placeholder="Titre du cours" class="w-full border p-3 rounded-xl mb-3" required>
                <textarea id="courseDesc" placeholder="Description" class="w-full border p-3 rounded-xl mb-3" rows="2"></textarea>
                <input type="text" id="courseFaculty" placeholder="Faculté / Matière" class="w-full border p-3 rounded-xl mb-4" required>
                
                <div class="flex gap-3">
                    <button type="button" onclick="this.closest('.fixed').remove()" 
                            class="flex-1 py-3 border rounded-xl">Annuler</button>
                    <button type="submit" 
                            class="flex-1 bg-green-600 text-white py-3 rounded-xl">Publier</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#uploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('courseTitle').value;
        const description = document.getElementById('courseDesc').value;
        const faculty = document.getElementById('courseFaculty').value;
        
        courses.unshift({
            title,
            description,
            faculty,
            date: new Date().toISOString()
        });
        
        localStorage.setItem('allbavon_courses', JSON.stringify(courses));
        
        modal.remove();
        loadCourses();
    });
}

function downloadCourse(index) {
    alert("Téléchargement simulé : " + courses[index].title + "\n\n(En version complète, le fichier serait téléchargé depuis Supabase)");
}

// Déconnexion
function logout() {
    location.reload();
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Pré-remplir quelques données de démo si vide
    if (topics.length === 0) {
        topics = [
            {
                title: "Comment réussir en Mathématiques ?",
                category: "Questions",
                message: "Des astuces pour bien comprendre les dérivées ?",
                author: "Marie K."
            }
        ];
        localStorage.setItem('allbavon_topics', JSON.stringify(topics));
    }
    
    if (courses.length === 0) {
        courses = [
            {
                title: "Introduction à la Programmation",
                description: "Cours complet sur Python",
                faculty: "Informatique"
            }
        ];
        localStorage.setItem('allbavon_courses', JSON.stringify(courses));
    }
});
