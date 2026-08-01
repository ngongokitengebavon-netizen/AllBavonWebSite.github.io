// ==============================================
// ALLBAVON - Script Principal (Version Premium)
// ==============================================

// === CONFIGURATION ===
const ADMIN_CODE = "ba167144";
const USER_CODE = "26061960";   // Code mis à jour à 8 chiffres

// === DONNÉES ===
let currentUser = null;
let topics = JSON.parse(localStorage.getItem('allbavon_topics')) || [];
let courses = JSON.parse(localStorage.getItem('allbavon_courses')) || [];

// === VÉRIFICATION DU CODE D'ACCÈS ===
function verifyAccessCode() {
    const codeInput = document.getElementById('accessCode');
    const errorDiv = document.getElementById('codeError');
    const code = codeInput.value.trim();

    if (!code) {
        errorDiv.textContent = "Veuillez entrer un code.";
        errorDiv.classList.remove('hidden');
        return;
    }

    if (code === ADMIN_CODE) {
        errorDiv.classList.add('hidden');
        showAdminDashboard();
    } else if (code === USER_CODE) {
        errorDiv.classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.querySelector('.max-w-5xl').classList.add('hidden');
        loadForum();
        loadCourses();
    } else {
        errorDiv.textContent = "Code incorrect. Réessayez.";
        errorDiv.classList.remove('hidden');
    }
}

// === MODALS ===
function showAccessRequestModal() {
    const modal = document.getElementById('accessRequestModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function hideAccessRequestModal() {
    const modal = document.getElementById('accessRequestModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// === DEMANDE D'ACCÈS ===
function submitAccessRequest(e) {
    e.preventDefault();
    const form = e.target;
    
    setTimeout(() => {
        alert("✅ Demande envoyée avec succès !\n\nNous vous contacterons bientôt.");
        hideAccessRequestModal();
        form.reset();
    }, 800);
}

// === CRÉATION DE COMPTE ===
function createAccount(e) {
    e.preventDefault();
    
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const faculty = document.getElementById('faculty').value.trim();

    if (!name || !email || !password || !faculty) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    currentUser = { name, email, faculty, joined: new Date().toISOString() };
    
    const modal = document.getElementById('createAccountModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    document.getElementById('main-content').classList.remove('hidden');
    document.querySelector('.max-w-5xl').classList.add('hidden');
    
    loadForum();
    loadCourses();
    
    setTimeout(() => {
        alert(`Bienvenue ${name.split(' ')[0]} ! 🎉\nVotre compte a été créé avec succès.`);
    }, 600);
}

// === TABLEAU DE BORD ADMIN ===
function showAdminDashboard() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="flex justify-between items-center mb-10">
                <div>
                    <h1 class="text-4xl font-semibold tracking-tight">Tableau de bord</h1>
                    <p class="text-white/60">Administration AllBavon</p>
                </div>
                <button onclick="logout()" 
                        class="px-5 py-2.5 text-sm border border-white/20 rounded-2xl hover:bg-white/5 transition-colors">
                    Se déconnecter
                </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                <div class="admin-stat p-6 rounded-3xl">
                    <div class="text-5xl font-semibold">1,284</div>
                    <div class="text-white/60 mt-1">Utilisateurs inscrits</div>
                </div>
                <div class="admin-stat p-6 rounded-3xl">
                    <div class="text-5xl font-semibold">312</div>
                    <div class="text-white/60 mt-1">Sujets de forum</div>
                </div>
                <div class="admin-stat p-6 rounded-3xl">
                    <div class="text-5xl font-semibold">178</div>
                    <div class="text-white/60 mt-1">Cours partagés</div>
                </div>
                <div class="admin-stat p-6 rounded-3xl">
                    <div class="text-5xl font-semibold">24</div>
                    <div class="text-white/60 mt-1">Facultés</div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="glass p-8 rounded-3xl border border-white/10">
                    <h3 class="font-semibold mb-4 text-lg">Codes d'accès</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-white/70">Administrateur</span>
                            <code class="bg-white/10 px-4 py-1 rounded-xl font-mono">${ADMIN_CODE}</code>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-white/70">Utilisateur</span>
                            <code class="bg-white/10 px-4 py-1 rounded-xl font-mono">${USER_CODE}</code>
                        </div>
                    </div>
                </div>

                <div class="glass p-8 rounded-3xl border border-white/10">
                    <h3 class="font-semibold mb-2 text-lg">Contact Administrateur</h3>
                    <p class="text-white/70">ngongokitengebavon@gmail.com</p>
                </div>
            </div>
        </div>
    `;
    
    main.classList.remove('hidden');
    document.querySelector('.max-w-5xl').classList.add('hidden');
}

// === FORUM ===
function loadForum() {
    const container = document.getElementById('forum-list');
    if (!container) return;

    container.innerHTML = '';

    if (topics.length === 0) {
        container.innerHTML = `
            <div class="glass p-8 rounded-3xl text-center border border-white/10">
                <p class="text-white/60">Aucun sujet pour le moment.<br>Soyez le premier à poser une question !</p>
            </div>
        `;
        return;
    }

    topics.forEach((topic) => {
        const div = document.createElement('div');
        div.className = `topic-card p-6 rounded-3xl flex justify-between items-start`;
        div.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <span class="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80">${topic.category}</span>
                    <span class="text-xs text-white/50">${topic.author || 'Anonyme'}</span>
                </div>
                <h4 class="font-semibold text-lg">${topic.title}</h4>
                <p class="text-white/70 mt-1 line-clamp-2">${topic.message}</p>
            </div>
            <div class="text-right text-xs text-white/50 ml-4">
                ${new Date(topic.date || Date.now()).toLocaleDateString('fr-FR')}
            </div>
        `;
        container.appendChild(div);
    });
}

function showNewTopicModal() {
    const modalHTML = `
        <div id="newTopicModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div class="glass p-8 rounded-3xl w-full max-w-lg mx-4 border border-white/10">
                <h3 class="text-2xl font-semibold mb-6">Créer un nouveau sujet</h3>
                <form id="newTopicForm">
                    <div class="space-y-4">
                        <input type="text" id="topicTitle" placeholder="Titre du sujet" class="w-full bg-white/5 border border-white/20 px-5 py-3.5 rounded-2xl" required>
                        
                        <select id="topicCategory" class="w-full bg-white/5 border border-white/20 px-5 py-3.5 rounded-2xl">
                            <option value="Questions">Questions</option>
                            <option value="Cours">Cours</option>
                            <option value="Examens">Examens</option>
                            <option value="Nouvelles">Nouvelles</option>
                            <option value="Divers">Divers</option>
                        </select>
                        
                        <textarea id="topicMessage" placeholder="Votre message..." class="w-full bg-white/5 border border-white/20 px-5 py-3.5 rounded-2xl h-28 resize-y" required></textarea>
                    </div>
                    
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="document.getElementById('newTopicModal').remove()" 
                                class="flex-1 py-3.5 border border-white/20 rounded-2xl">Annuler</button>
                        <button type="submit" 
                                class="flex-1 py-3.5 bg-white text-black font-semibold rounded-2xl">Publier</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const form = document.getElementById('newTopicForm');
    form.addEventListener('submit', function(e) {
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
        
        document.getElementById('newTopicModal').remove();
        loadForum();
    });
}

// === ESPACE COURS ===
function loadCourses() {
    const container = document.getElementById('courses-list');
    if (!container) return;

    container.innerHTML = '';

    if (courses.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 glass p-8 rounded-3xl text-center border border-white/10">
                <p class="text-white/60">Aucun cours partagé pour le moment.</p>
            </div>
        `;
        return;
    }

    courses.forEach((course, index) => {
        const div = document.createElement('div');
        div.className = `course-card glass p-6 rounded-3xl border border-white/10`;
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-semibold text-lg">${course.title}</h4>
                    <p class="text-sm text-white/60 mt-1">${course.description || ''}</p>
                    <span class="inline-block mt-3 text-xs px-3 py-1 bg-white/10 rounded-full">${course.faculty}</span>
                </div>
                <button onclick="downloadCourse(${index})" 
                        class="text-blue-400 hover:text-blue-300 transition-colors">
                    <i class="fas fa-download text-xl"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function showUploadCourseModal() {
    const modalHTML = `
        <div id="uploadModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div class="glass p-8 rounded-3xl w-full max-w-md mx-4 border border-white/10">
                <h3 class="text-2xl font-semibold mb-6">Partager un cours</h3>
                <form id="uploadForm">
                    <div class="space-y-4">
                        <input type="text" id="courseTitle" placeholder="Titre du cours" class="w-full bg-white/5 border border-white/20 px-5 py-3.5 rounded-2xl" required>
                        <textarea id="courseDesc" placeholder="Description brève" class="w-full bg-white/5 border border-white/20 px-5 py-3.5 rounded-2xl h-20 resize-y"></textarea>
                        <input type="text" id="courseFaculty" placeholder="Faculté / Matière" class="w-full bg-white/5 border border-white/20 px-5 py-3.5 rounded-2xl" required>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="document.getElementById('uploadModal').remove()" 
                                class="flex-1 py-3.5 border border-white/20 rounded-2xl">Annuler</button>
                        <button type="submit" 
                                class="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl">Publier</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', function(e) {
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
        
        document.getElementById('uploadModal').remove();
        loadCourses();
    });
}

function downloadCourse(index) {
    const course = courses[index];
    alert(`📥 Téléchargement simulé\n\n${course.title}\n\nEn version complète, le fichier serait téléchargé depuis Supabase.`);
}

// === DÉCONNEXION ===
function logout() {
    location.reload();
}

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', function() {
    if (topics.length === 0) {
        topics = [
            {
                title: "Comment réussir en Mathématiques ?",
                category: "Questions",
                message: "Des astuces pour bien comprendre les dérivées et intégrales ?",
                author: "Marie K.",
                date: new Date().toISOString()
            }
        ];
        localStorage.setItem('allbavon_topics', JSON.stringify(topics));
    }
    
    if (courses.length === 0) {
        courses = [
            {
                title: "Introduction à la Programmation",
                description: "Cours complet sur Python",
                faculty: "Informatique",
                date: new Date().toISOString()
            }
        ];
        localStorage.setItem('allbavon_courses', JSON.stringify(courses));
    }
    
    console.log('%c[AllBavon] Site chargé avec succès', 'color:#666');
});
