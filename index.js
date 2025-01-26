const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

const BLOG_HOST = `https://www.medium.com/@prxshetty`;

/* README Sections */
const introTitle = generateTitle(2, `Hello there, I'm ${generateLink('Pranam', 'https://prxshetty.github.io/')}`);
const introDescription = `I am currently a Data Science Master's student at ${generateLink('RIT', 'https://www.rit.edu/')} pursuing my Master's in Data Science. I am working on some side projects, learning a couple languages, and trying to figure out the perfect way to cook a chicken.`;

const badgeConfigs = [{
        name: 'Website',
        badgeText: 'prxshetty.github.io',
        labelBgColor: '4E69C8',
        logoBgColor: '4E69C8',
        logo: 'Firefox',
        link: 'https://prxshetty.github.io',
    },
    {
        name: 'Medium',
        badgeText: '@prxshetty',
        labelBgColor: '14c767',
        logoBgColor: '14c767',
        logo: 'Medium',
        link: 'https://medium.com/@prxshetty',
    },
    {
        name: 'LinkedIn',
        badgeText: '@prxshetty',
        labelBgColor: '0077B5',
        logoBgColor: '0077B5',
        logo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/prxshetty/',
    },
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGdia2xzaWhoYXhnY3RmMmd3OHNrYmo1a3k5ZmM0aWUyc2tvbWY5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iF38ziTbss8j6/giphy.gif" />`;
const factsTitle = generateTitle(2, `⚡ A Glimpse of Me`);
const factsConfigs = [
    `🔭 Building [LinkedOut](https://github.com/prxshetty/linkedout), a project I hold close to my heart.`,
    `🧐 Reading on LLM's, AI workflows, new breakthroughs and a pinch of software architecture.`,
    `👨‍💻 My experiments and projects await your curiosity on [Github](https://github.com/prxshetty).`,
    `📝 Occasionally, I pen down my thoughts and insights on [Medium](${BLOG_HOST}).`,
    `💬 Let's talk about **AI, Stocks, Data, and all things innovation**.`,
    `📄 If you're curious, here's my [resume](https://prxshetty.github.io/docs/Pranam_ResumeF.pdf).`,
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');
const toolsTitle = generateTitle(2, `🚀 My Tech Stacks`);
const toolsIconSize = 30;
const toolsConfig = [
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg', alt: 'Python' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg', alt: 'Java' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg', alt: 'React' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg', alt: 'Docker' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg', alt: 'Kubernetes' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg', alt: 'TensorFlow' },
    { src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg', alt: 'GCP' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', alt: 'AWS' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original-wordmark.svg', alt: 'Flask' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg', alt: 'NGINX' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', alt: 'SQLite' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg', alt: 'Redis' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg', alt: 'MongoDB' },
    { src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg', alt: 'Git' },
    { src: 'https://raw.githubusercontent.com/pytorch/pytorch/master/docs/source/_static/img/pytorch-logo-dark.svg', alt: 'PyTorch' },
    { src: 'https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo.svg', alt: 'Scikit-learn' },
    { src: 'https://raw.githubusercontent.com/pandas-dev/pandas/main/web/pandas/static/img/pandas.svg', alt: 'Pandas' },
    { src: 'https://raw.githubusercontent.com/numpy/numpy/main/branding/logo/primary/numpylogo.svg', alt: 'NumPy' },
];
const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

// const stats = `<img src="https://github-readme-stats.vercel.app/api?username=prxshetty&show_icons=true&count_private=true" alt="prxshetty" />`;

// const visitors = `[![HitCount](https://hits.dwyl.com/prxshetty/prxshetty.svg?style=flat-square)](http://hits.dwyl.com/prxshetty/prxshetty)`;

const content = `${introTitle}\n
${introDescription}\n
${badges}\n
${gif}\n
${factsTitle}\n
${facts}\n
${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n`;

const markdownContent = md.render(content);

fs.writeFile('README.md', markdownContent, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info(`Writing to README.md`);
});

function generateBadge(badgeConfig) {
    return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat-square&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
    return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
    return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
    return `[${label}](${link})`;
}
