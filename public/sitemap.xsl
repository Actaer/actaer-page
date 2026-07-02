<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">

    <xsl:output method="html" encoding="UTF-8" indent="yes" />

    <xsl:template match="/">
        <html lang="en">
            <head>
                <title>XML Sitemap — Actaer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>
                    :root {
                    --bg: #ffffff;
                    --border: #e0e0e0;
                    --text: #161616;
                    --text-muted: #525252;
                    --accent: #0f62fe;
                    --accent-hover: #0043ce;
                    --surface: #f4f4f4;
                    }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                    font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: var(--bg);
                    color: var(--text);
                    line-height: 1.6;
                    padding: 2rem;
                    }
                    .container { max-width: 1200px; margin: 0 auto; }
                    header {
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid var(--border);
                    }
                    h1 {
                    font-size: 1.75rem;
                    font-weight: 300;
                    margin-bottom: 0.5rem;
                    }
                    .subtitle { color: var(--text-muted); font-size: 0.95rem; }
                    .stats {
                    display: flex;
                    gap: 2rem;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    }
                    .stat { color: var(--text-muted); }
                    .stat strong { color: var(--text); }
                    table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.875rem;
                    }
                    th {
                    text-align: left;
                    padding: 0.875rem 1rem;
                    background: var(--surface);
                    font-weight: 500;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.05em;
                    }
                    td {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid var(--border);
                    }
                    tr:last-child td { border-bottom: none; }
                    tr:hover td { background: var(--surface); }
                    a {
                    color: var(--accent);
                    text-decoration: none;
                    word-break: break-all;
                    }
                    a:hover { color: var(--accent-hover); text-decoration: underline; }
                    .langs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                    }
                    .lang {
                    display: inline-block;
                    padding: 0.125rem 0.375rem;
                    background: var(--surface);
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    }
                    @media (max-width: 768px) {
                    body { padding: 1rem; }
                    .stats { flex-direction: column; gap: 0.5rem; }
                    th, td { padding: 0.5rem; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>XML Sitemap</h1>
                        <p class="subtitle">This sitemap is used by search engines to discover and
                            index pages on actaer.com</p>
                        <div class="stats">
                            <span class="stat"><strong>
                                    <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
                                </strong>
                                URLs</span>
                            <span class="stat"><strong>6</strong> Languages (EN, SR, DE, ES, PT, PL)</span>
                        </div>
                    </header>
                    <table>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Last Modified</th>
                                <th>Alternates</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <tr>
                                    <td>
                                        <a href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc" />
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)" />
                                    </td>
                                    <td>
                                        <div class="langs">
                                            <xsl:for-each select="xhtml:link[@rel='alternate']">
                                                <a class="lang" href="{@href}">
                                                    <xsl:value-of select="@hreflang" />
                                                </a>
                                            </xsl:for-each>
                                        </div>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
