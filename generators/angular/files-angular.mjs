export const files = {
    angular: [
        {
            path: 'src/main/webapp/',
            templates: [
                // Layout files
                {
                    file: 'app/layouts/main/main.component.html',
                    renameTo: () => 'app/layouts/main/main.component.html',
                },
                {
                    file: 'app/layouts/navbar/navbar.component.html',
                    renameTo: () => 'app/layouts/navbar/navbar.component.html',
                },
                
                // SCSS files
                {
                    file: 'content/scss/_modern-variables.scss',
                    renameTo: () => 'content/scss/_modern-variables.scss',
                },
                {
                    file: 'content/scss/_modern-components.scss',
                    renameTo: () => 'content/scss/_modern-components.scss',
                },
                {
                    file: 'content/scss/_modern-entity.scss',
                    renameTo: () => 'content/scss/_modern-entity.scss',
                },
                {
                    file: 'content/scss/global.scss',
                    renameTo: () => 'content/scss/global.scss',
                },

                // Entity templates
                {
                    file: 'app/entities/_common/list/entity-list.component.html.ejs',
                    renameTo: (data) => `app/entities/\${data.entityFolderName}/list/\${data.entityFileName}.component.html`,
                },
                {
                    file: 'app/entities/_common/list/entity-list.component.ts.ejs',
                    renameTo: (data) => `app/entities/\${data.entityFolderName}/list/\${data.entityFileName}.component.ts`,
                },
                {
                    file: 'app/entities/_common/detail/entity-detail.component.html.ejs',
                    renameTo: (data) => `app/entities/\${data.entityFolderName}/detail/\${data.entityFileName}-detail.component.html`,
                },
                {
                    file: 'app/entities/_common/detail/entity-detail.component.ts.ejs',
                    renameTo: (data) => `app/entities/\${data.entityFolderName}/detail/\${data.entityFileName}-detail.component.ts`,
                },
                {
                    file: 'app/entities/_common/update/entity-update.component.html.ejs',
                    renameTo: (data) => `app/entities/\${data.entityFolderName}/update/\${data.entityFileName}-update.component.html`,
                },
                {
                    file: 'app/entities/_common/update/entity-update.component.ts.ejs',
                    renameTo: (data) => `app/entities/\${data.entityFolderName}/update/\${data.entityFileName}-update.component.ts`,
                },
            ],
        },
    ],
}; 