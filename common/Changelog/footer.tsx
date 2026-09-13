import { Components, UI } from "@api";
import { Manifest } from "@manifest";
import React from "react";

const { Text } = Components;

export default function Footer({ manifest }: { manifest: Manifest }) {
    if (!manifest.invite && !manifest.source) return null;

    let issuesUrl: string | undefined;
    if (manifest.source) {
        const url = new URL(manifest.source);
        const [, owner, repo] = url.pathname.split("/");
        url.pathname = `/${owner}/${repo}/issues`;
        issuesUrl = url.toString();
    }

    return (
        <Text>
            Need support?{" "}
            {manifest.invite && (
                <>
                    Join the{" "}
                    <a onClick={() => UI.showInviteModal(manifest.invite!)} style={{ textDecoration: "underline" }}>
                        Discord Server
                    </a>
                    {manifest.source && " or "}
                </>
            )}
            {manifest.source && (
                <>
                    Check for Issues on{" "}
                    <a href={issuesUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                        GitHub
                    </a>
                </>
            )}
        </Text>
    );
}
