import { describe, expect, it } from "vitest";

import { getResumeLink, getResumeUrl } from "./resume";

describe("getResumeUrl", () => {
  it("returns null when RESUME_URL is missing or blank", () => {
    expect(getResumeUrl({})).toBeNull();
    expect(getResumeUrl({ RESUME_URL: "   " })).toBeNull();
  });

  it("accepts a root-relative path", () => {
    expect(getResumeUrl({ RESUME_URL: "/resume.pdf" })).toBe("/resume.pdf");
  });

  it("rejects protocol-relative paths", () => {
    expect(getResumeUrl({ RESUME_URL: "//evil.example/resume.pdf" })).toBeNull();
  });

  it("accepts http and https URLs", () => {
    expect(getResumeUrl({ RESUME_URL: "https://example.com/resume.pdf" })).toBe(
      "https://example.com/resume.pdf",
    );
  });

  it("rejects other protocols and invalid values", () => {
    expect(getResumeUrl({ RESUME_URL: "ftp://example.com/resume.pdf" })).toBeNull();
    expect(getResumeUrl({ RESUME_URL: "javascript:alert(1)" })).toBeNull();
    expect(getResumeUrl({ RESUME_URL: "not a url" })).toBeNull();
  });

  it("trims surrounding whitespace", () => {
    expect(getResumeUrl({ RESUME_URL: "  /resume.pdf  " })).toBe("/resume.pdf");
  });
});

describe("getResumeLink", () => {
  it("returns null without a URL", () => {
    expect(getResumeLink({})).toBeNull();
  });

  it("marks a local path as a download", () => {
    expect(getResumeLink({ RESUME_URL: "/resume.pdf" })).toEqual({
      href: "/resume.pdf",
      external: false,
      download: true,
      label: "Download resume (PDF)",
    });
  });

  it("marks an external URL as a new-tab view", () => {
    expect(getResumeLink({ RESUME_URL: "https://example.com/resume.pdf" })).toEqual({
      href: "https://example.com/resume.pdf",
      external: true,
      download: false,
      label: "View resume (PDF)",
    });
  });
});
