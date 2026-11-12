import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'ThreeTAG Documentation',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',
    url: 'https://docs-preview.threetag.net',
    baseUrl: '/',
    organizationName: 'ThreeTAG',
    projectName: 'Documentation',
    deploymentBranch: 'deployment',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    lastVersion: "current",
                    includeCurrentVersion: true,
                    versions: {
                        current: {
                            label: "26.1+",
                        },
                        "1.20": {
                            label: "1.20.1"
                        }
                    },
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        ({
            image: 'img/social-card.jpg',
            navbar: {
                title: 'ThreeTAG Documentation',
                logo: {
                    alt: 'Logo',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'addonpacks',
                        position: 'left',
                        label: 'Addon Pack Development',
                    },
                    {
                        type: "docsVersionDropdown",
                        position: "right",
                    },
                    {
                        href: 'https://git.threetag.net/ThreeTAG/Documentation',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Links',
                        items: [
                            {
                                label: 'Discord',
                                href: 'https://discord.com/invite/GATzmppJms',
                            },
                            {
                                label: 'CurseForge',
                                href: 'https://www.curseforge.com/members/lucraft/projects',
                            },
                            {
                                label: 'Modrinth',
                                href: 'https://modrinth.com/organization/threetag',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://git.threetag.net/ThreeTAG',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} ThreeTAG, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
