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
                    --bg: #0a0a0a;
                    --card: #141414;
                    --border: #262626;
                    --text: #fafafa;
                    --text-muted: #a1a1aa;
                    --accent: #3b82f6;
                    --accent-hover: #2563eb;
                    }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
                    font-weight: 600;
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
                    background: var(--card);
                    border-radius: 8px;
                    overflow: hidden;
                    font-size: 0.875rem;
                    }
                    th {
                    text-align: left;
                    padding: 0.875rem 1rem;
                    background: var(--border);
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
                    tr:hover td { background: rgba(255,255,255,0.02); }
                    a {
                    color: var(--accent);
                    text-decoration: none;
                    word-break: break-all;
                    }
                    a:hover { color: var(--accent-hover); text-decoration: underline; }
                    .priority {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    }
                    .priority-high { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
                    .priority-med { background: rgba(234, 179, 8, 0.2); color: #eab308; }
                    .priority-low { background: rgba(156, 163, 175, 0.2); color: #9ca3af; }
                    .langs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                    }
                    .lang {
                    display: inline-block;
                    padding: 0.125rem 0.375rem;
                    background: var(--border);
                    border-radius: 3px;
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
                        <h1>🗺️ XML Sitemap</h1>
                        <p class="subtitle">This sitemap is used by search engines to discover and
                            index pages on actaer.com</p>
                        <div class="stats">
                            <span class="stat"><strong>
                                    <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
                                </strong>
                                URLs</span>
                            <span class="stat"><strong>5</strong> Languages (EN, SR, DE, ES, PT)</span>
                        </div>
                    </header>
                    <table>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Priority</th>
                                <th>Change Freq</th>
                                <th>Last Modified</th>
                                <th>Alternates</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <xsl:sort select="sitemap:priority" order="descending"
                                    data-type="number" />
                                <tr>
                                    <td>
                                        <a href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc" />
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:variable name="priority" select="sitemap:priority" />
                                        <span>
                                            <xsl:attribute name="class">
                                                <xsl:text>priority </xsl:text>
                                                <xsl:choose>
                                                    <xsl:when test="$priority &gt;= 0.8">
                                                        priority-high</xsl:when>
                                                    <xsl:when test="$priority &gt;= 0.5">
                                                        priority-med</xsl:when>
                                                    <xsl:otherwise>priority-low</xsl:otherwise>
                                                </xsl:choose>
                                            </xsl:attribute>
                                            <xsl:value-of select="$priority" />
                                        </span>
                                    </td>
                                    <td>
                                        <xsl:value-of select="sitemap:changefreq" />
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