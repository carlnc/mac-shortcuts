'use strict';

const e = React.createElement;

const allShortcuts = [
    {
        app: 'macos',
        groups: [
            {
                name: 'Windowing',
                shortcuts: [
                    { mods: '',    key: '⊕⊕',  action: 'Expand (or restore) window to full desk top', notes: 'double click titlebar while holding' },
                    { mods: '',    key: '⊕⊕',  action: 'Expand window edge/corner to desktop edge', notes: 'double click edge' },
                    { mods: '⌥',   key: '⊕⊕',  action: 'Expand window to desktop edge', notes: 'double click edge or corner while holding option' },
                    { mods: '⌃ ⌘', key: 'F',   action: 'Enter/Exit full screen', notes: '*Application specific' },
                    { mods: '⌘',   key: '⊕',   action: 'Move background window', notes: 'Cmd-Drag on background window’s titlebar without switching to it.' },
                ],
            },
            {
                name: 'App Switcher',
                shortcuts: [
                    { mods: '',                  key: '',              action: '',                          notes: '' },
                    { mods: '⌘',                 key: 'tab',           action: 'Toggle to the most recently used app among your open apps.', notes: 'Press Cmd-Tab to switch to last used app.\nPress Cmd-Tab again to switch back.' },
                    { mods: '…', key: '⇥',             action: 'go to next app',            notes: '• press Tab (multiple times as needed) to scroll right,' },
                    { mods: '…', key: '` ∕ ⇧﹢⇥',       action: 'go to previous app',        notes: '• press Backtick(`) or Shift-Tab to scroll left,' },
                    { mods: '…', key: '← →',           action: 'go to next/previos app',    notes: '• press Left/Right Arrow keys,' },
                    { mods: '…', key: '↖ ↘',           action: 'go to first/last app',      notes: '• press End/Home key to go to first/last app' },
                    { mods: '…', key: '<mouse hover>', action: 'go to focused app',         notes: '• aim with the mouse' },
                    { mods: '…', key: 'Q',             action: 'Quit selected app',         notes: '' },
                    { mods: '…', key: 'H',             action: 'Hide selected app',         notes: '' },
                    { mods: '…', key: '⎋',             action: 'Cancel/close App Switcher', notes: '' },
                    { mods: '…', key: '↑ ↓',           action: 'App Exposé selected app',   notes: 'See shortcuts available when in App Exposé mode.  Not available in fullscreen app.' },
                    { mods: '⌘',                 key: '`',             action: 'Cycles through active app windows in MRU order', notes: '' },
                    { mods: '⇧ ⌘',               key: '`',             action: 'Switch to previous window', notes: '' },
                ],
            },
            {
                name: 'Mission Control',
                shortcuts: [
                ],
            },
            {
                name: 'App Exposé',
                shortcuts: [
                ],
            },
            {
                name: 'Menubar',
                shortcuts: [
                ],
            },
            {
                name: 'Dock',
                shortcuts: [
                ],
            },
            {
                name: 'Text Inputs',
                shortcuts: [
                ],
            },
            {
                name: 'Spotlight',
                shortcuts: [
                ],
            },
        ],
    },
];

class ShortcutsTable extends React.Component {
    render() {
        return e('table', { className: 'table table-striped table-bordered table-sm' }, [
            this.renderHead(),
            this.renderRows(),
        ]);
    }

    getFilteredRows(filter) {
        return allShortcuts;
    }

    renderHead() {
        return '';
    
        return e('thead', null, [
            e('tr', null, [
                e('th', { scope: 'col'}, 'mods'),
                e('th', { scope: 'col'}, 'key'),
                e('th', { scope: 'col'}, 'action and notes'),
            ]),
        ]);
    }

    renderRows() {
        const shortcuts = this.getFilteredRows(undefined);

        const trs = Object.values(shortcuts).map(shortcut => {
            const appName = shortcut.app;
            return [
                this.renderAppHeaderRow(appName),
                ...shortcut.groups.map(group => {
                    return [
                        this.renderGroupHeaderRow(appName, group.name),
                        ...group.shortcuts.map(shortcut => {
                            return this.renderRow(appName, group.name, shortcut);
                        }),
                    ];
                }),
            ];
        });

        return e('tbody', null, trs);
    }

    renderAppHeaderRow(appName) {
        return e('tr', null, [
            e('th', { colspan: '3' }, appName),
        ]);
    }
    
    renderGroupHeaderRow(appName, groupName) {
        return e('tr', null, [
            e('th', { colspan: '3' }, groupName),
        ]);
    }

    renderRow(appName, groupName, shortcut) {
        const { mods, key, action, notes } = shortcut;
        const attribs = !notes ? null : {
            'data-toggle':    'tooltip',
            'data-placement': 'bottom',
            title:            notes,
        };

        false && notes && details.push(
            e('br'),
            e('span', { className: 'text-black-50' }, ' — '),
            e('span', { className: 'text-black-50' }, notes),
        );            

        return e('tr', null, [
            e('td', { className: 'text-nowrap text-right' }, mods),
            e('td', { className: 'text-nowrap text-center' }, key),
            e('td', null, e('span', attribs, action)),
        ]);
    }
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

ReactDOM.render(e(ShortcutsTable), document.getElementById('table'));